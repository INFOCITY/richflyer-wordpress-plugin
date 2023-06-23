/**
 * rf-serviceworker.js
 * Webプッシュの表示等に関わるメソッド群です。
 *
 * お客様で編集した場合の動作の保証はできかねますのでご了承ください
 * Copyright © 2019年 INFOCITY,Inc. All rights reserved.
 */

/**
 * RichFlyerサーバより配信された通知を表示します。
 * 参照: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
 * @param {string} Title 通知のタイトル
 * @param {string} Icon 表示する画像のURL。RichFlyerの管理サイトで指定した画像。Webプッシュ用にリサイズされている。
 * @param {string} Body 通知の本文
 * @param {string} notification_id RichFlyerで割り当てられた通知ID
 * @param {string} url 一番目のアクションボタンに設定したURL
 * @param {string} click_action 拡張プロパティに設定した文字列
 * @return {Promise} 結果
 */
function showNotification({
  Title: title = "",
  Icon: icon = "",
  Body: body = "(with empty payload)",
  notification_id: tag = "",
  url: url = null,
  click_action: click_action = null,
  action_buttons: action_buttons = null,
}) {
  var param = {
    icon,
    body,
    tag,
    vibrate: [400, 100, 400],
  };

  param.data = click_action ? click_action : url;

  const actions =
    action_buttons && Array.isArray(action_buttons)
      ? action_buttons.map((action) => ({
          title: action.label,
          action: action.value,
        }))
      : null;

  if (actions) {
    param.actions = actions;
  }

  return self.registration.showNotification(title, param);
}

/**
 * プッシュ通知を受信すると呼ばれます。
 * 受信した通知をshowNotificationに渡して表示処理を実行します。
 * @param {PushEvent} 受信したプッシュ通知のオブジェクト
 */
function receivePush(event) {
  //notification_idの保存
  putEventLogIndexedDB(event);

  //通知の表示を実行
  if (event.data && "showNotification" in self.registration) {
    event.waitUntil(showNotification(event.data.json()));
  }
}

/**
 * プッシュ通知オブジェクトにあるnotification_idを記録します。
 * @param {PushEvent} 受信したプッシュ通知のオブジェクト
 */
function putEventLogIndexedDB(event) {
  const jsonData = event.data.json();
  const notificationId = jsonData.notification_id;
  const db = self.indexedDB.open("richflyer_database", 1);
  //オブジェクトストア登録
  db.addEventListener("upgradeneeded", (e) => {
    const _db = e.target.result;
    if (!_db.objectStoreNames.contains("notification")) {
      _db.createObjectStore("notification", { keyPath: "name" });
    }
  });
  db.addEventListener("success", (e) => {
    const _db = db.result;
    const transaction = _db.transaction("notification", "readwrite");
    const store = transaction.objectStore("notification");
    const notSentEventLog = 0;
    store.put({
      name: "richflyer_notification",
      notification_id: notificationId,
      is_sent_event_log: notSentEventLog,
    });
  });
  db.addEventListener("error", (e) => {
    console.log(e);
  });
}

/**
 * showNotificationによって表示された通知をクリックもしくはタップしたときに呼ばれます。
 * 一番目のアクションボタンに設定されたURLを開きます。
 * アクションボタンが設定されていない場合は何もしません。
 * @param {NotificationEvent} クリックした通知のオブジェクト
 */
function notificationClick(event) {
  event.notification.close();

  var actions = event.notification.actions;
  var extendedProperty = event.notification.data;
  var selectedAction = event.action;

  var action;
  if (selectedAction) {
    action = selectedAction;
  } else if (extendedProperty) {
    action = extendedProperty;
  } else if (actions && actions.length > 0) {
    action = actions[0].action;
  }

  if (action) {
    event.waitUntil(clients.openWindow(action));
  }
}

self.addEventListener("install", function (event) {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("push", receivePush, false);
self.addEventListener("notificationclick", notificationClick, false);
