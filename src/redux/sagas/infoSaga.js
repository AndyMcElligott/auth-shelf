import axios from 'axios'
import { put, takeEvery} from 'redux-saga/effects';

function* infoSaga() {
    yield takeEvery('FETCH_BOOKS', fetchBooks);
}

function* fetchBooks() {
    try {
        let response = yield axios.get('/api/shelf')
        console.log(response.data);
        yield put ({ type: 'SET_BOOKS', payload: response.data })

    }
    catch (error) {
        console.log('Error getting books', error)
    }
}







export default infoSaga