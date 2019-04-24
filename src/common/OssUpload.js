import axiosFd from 'axios'
import axios from 'axios';

export default class OssUpload {
  constructor() {
    this.blob = null
    this.policyData = null
  }


  async convertBase64UrlToBlob(urlData) {
    var bytes = window.atob(urlData.split(',')[1]);

    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    this.blob = new Blob([ab], {type: 'image/png'});
    return this.blob
  }

  /**
   *
   * @param dirPath第一级目录
   * @param folderPath 第二级目录
   */
  async setOssPolicy(fileType) {
    if (typeof (fileType) == 'undefined' || typeof (fileType) !== 'number') {
      console.error('fileType必传参数，参数类型为Number')
      return
    }
    let policyRes = await axios({
      method: 'get',
      url: '/common/policy',
      params: {
        fileType: fileType
      }
    })
    this.policyData = policyRes.data
  }

  //根据饿了么组件获取上传之前参数
  async getElOssPolicy(fileType, suffix) {
    await this.setOssPolicy(fileType)
    let ossResult = this.policyData
    let name = ossResult.saveName + '' + new Date().getTime()
    let suf = '.png'
    if (suffix) {
      suf = suffix
    }
    let objectKey = ossResult.startsWith + ossResult.saveName + name + suf
    let uploadData = {
      OSSAccessKeyId: ossResult.OSSAccessKeyId,
      policy: ossResult.policy,
      signature: ossResult.signature,
      key: objectKey

    }
    let url = ossResult.host + '/' + objectKey
    return {uploadData, url, host: ossResult.host, objectKey: objectKey}
  }

  //传统上传
  async uploadFileForFileStream(file, fileType,suffix) {
    await this.setOssPolicy(fileType)
    const {OSSAccessKeyId, host, policy, signature, startsWith, saveName} = this.policyData
    let fd = new FormData()
    let name = saveName + '' + new Date().getTime()
    let suf = '.png'
    if (suffix) {
      suf = suffix
    }
    let objectKey = startsWith + saveName + name + suf

    fd.append('OSSAccessKeyId', OSSAccessKeyId)
    fd.append('policy', policy)
    fd.append('signature', signature)
    fd.append('key', objectKey)
    fd.append('success_action_status', 200)
    fd.append('file', file, saveName)
    let images = await axiosFd({
      url: host,
      method: 'post',
      headers: {'Content-Type': 'multipart/form-data'},
      data: fd
    })
    let url = host + '/' + objectKey

    let result = {url: url, objectKey: objectKey, name: name}
    return result
  }

  /**
   * base64上传
   * @param base64
   * @param dirPath
   * @param folderPath
   * @returns {Promise.<{url: string, objectKey: string, name: string}>}
   */
  async uploadFileForBase64(base64, fileType,suffix) {
    let blob = await this.convertBase64UrlToBlob(base64)
    await this.setOssPolicy(fileType)
    const {OSSAccessKeyId, host, policy, signature, startsWith, saveName} = this.policyData
    let fd = new FormData()
    let name = saveName + '' + new Date().getTime()
    let suf = '.png'
    if (suffix) {
      suf = suffix
    }
    let objectKey = startsWith + saveName + name + suf

    fd.append('OSSAccessKeyId', OSSAccessKeyId)
    fd.append('policy', policy)
    fd.append('signature', signature)
    fd.append('key', objectKey)
    fd.append('success_action_status', 200)
    fd.append('file', blob, saveName)
    let images = await axiosFd({
      url: host,
      method: 'post',
      headers: {'Content-Type': 'multipart/form-data'},
      data: fd
    })
    let url = host + '/' + objectKey
    let result = {url: url, objectKey: objectKey, name: name}
    return result
  }

}