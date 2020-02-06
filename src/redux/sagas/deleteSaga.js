import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects';
import { connect } from 'react-redux';

function* deleteSaga() {
    yield takeEvery('DELETE_BOOK', deleteBooks);
}

function* deleteBooks(action) {
        try {
            let id = action.payload.id
            let response = yield axios.delete(`/api/shelf/${id}`);
            yield put({ type: 'FETCH_BOOKS' })
            console.log(response.data);
        }
        catch (error) {
            console.log('Error getting books', error)
        }
}

export default deleteSaga