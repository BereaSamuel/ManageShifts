import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

export interface Shift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  shiftPlace: string;
  wage: string;
  comment: string;
}
