import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const featuresService = {
    findAllFeatures: (page = 1) => axiosService.get(`${urls.features}`, {params: {page}}),
    findFeatureById:(featureId)=>axiosService.get(`${urls.features}/${featureId}`),
    deleteFeatureById:(featureId)=>axiosService.delete(`${urls.features}/${featureId}`),
    updateFeatureById:(featureId, feature)=>axiosService.put(`${urls.features}/${featureId}`, feature),
    saveFeature:(feature)=>axiosService.post(`${urls.features}`,feature)
}

export {
    featuresService
}