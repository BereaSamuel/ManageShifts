import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

export interface Shifts {
    Worker: string,
    Beggining: Timestamp,
    End: Timestamp,
    Place: string,
    Price: number,
    Profit: number
}

