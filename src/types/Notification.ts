interface Notification {
  type: "friend-req";
  recipient: string;
  sender: string;
  senderName: string;
  read: boolean;
  createdAt: firebase.firestore.Timestamp;
}
