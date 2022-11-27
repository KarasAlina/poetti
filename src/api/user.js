import qs from "qs";
import request from "../utils/request";

export function getProfile() {
  return request({
    url: "/getProfile",
    method: "get",
  });
}

export function updateProfile(data) {
  const options = qs.stringify(data);

  return request({
    url: "/updateProfile",
    method: "post",
    data: options,
  });
}

export function getWinners(data) {
  const options = qs.stringify(data);

  return request({
    url: "/getWinners?" + options,
    method: "get",
  });
}

export function getVideo(data) {
  const options = qs.stringify(data);

  return request({
    url: "/getVideo?" + options,
    method: "get",
  });
}

export function searchWinners(data) {
  const options = qs.stringify(data);

  return request({
    url: "/searchWinner",
    method: "post",
    data: options,
  });
}

export function getChecks(data) {
  const options = qs.stringify(data);
  return request({
    url: "/getCodes?" + options,
    method: "get",
  });
}

export function getGarant(data) {
  const options = qs.stringify(data);
  return request({
    url: "/getGarant?" + options,
    method: "get",
  });
}

export function getPrizes() {
  return request({
    url: "/prizes",
    method: "get",
  });
}

export function logOut() {
  return request({
    url: "/logout",
    method: "post",
  });
}

export function deleteProfile() {
  return request({
    url: "/deleteProfile",
    method: "post",
  });
}

export function sendFeedback(data) {
  const options = qs.stringify(data);

  return request({
    url: "/sendFeedback",
    method: "post",
    data: options,
  });
}

export function buyGarant(data) {
  const options = qs.stringify(data);

  return request({
    url: "/buyGarant",
    method: "post",
    data: options,
  });
}

export function registerCode(data) {
  const options = qs.stringify(data);

  return request({
    url: "/registerCode",
    method: "post",
    data: options,
  });
}

export function prizeData(data) {
  const options = qs.stringify(data);
  return request({
    url: "/prizeData",
    method: "post",
    data: options,
  });
}

export function prizeReceive(data) {
  const options = qs.stringify(data);

  return request({
    url: "/prizeReceive",
    method: "post",
    data: options,
  });
}
export function uploadImage(data) {
  const options = qs.stringify(data);

  return request({
    url: "/cropImage",
    method: "post",
    data: options,
  });
}
