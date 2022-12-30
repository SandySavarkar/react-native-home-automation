import Api from "../api";

export default {
    getMyDevice(param){
        return Api.get("/getMyDevice",{params:param});
    },
    // editProfile(id,data){
    //     return Api.put(`/updateUser/${id}`,data)
    // },
    scheduleTime(param){
        return Api.put("/scheduleTime",param)
    },
    setLimit(param){
        return Api.put("/setLimit",param)
    },
    getHistory(param){
        return Api.post('/getUserHistory',param)
    }
};
