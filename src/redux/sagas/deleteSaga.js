import axios from 'axios'
import { put, takeEvery} from 'redux-saga/effects';

function* deleteSaga() {
    yield takeEvery('DELETE_BOOK', deleteBooks);
}

function* deleteBooks(action) {
    try {
        let id = action.payload
        let response = yield axios.delete(`/api/shelf/${id}`);
        yield put ({ type: 'FETCH_BOOKS'})
        console.log(response.data);
    }
    catch (error) {
        console.log('Error getting books', error)
    }
}


export default deleteSaga