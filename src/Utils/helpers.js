import _ from 'lodash'
export const groupByKey = (array,key) => {
    return _.groupBy(array, key);
}

