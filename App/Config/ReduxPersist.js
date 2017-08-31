import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'
import {AsyncStorage} from 'react-native'

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
    active: true,
    reducerVersion: '1.0',
    storeConfig: {
        storage: AsyncStorage,
        whitelist: ['quote'],
        transforms: [immutablePersistenceTransform]
    }
}

export default REDUX_PERSIST
