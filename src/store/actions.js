import axios from 'axios'
import {HANDLE_TEXT, SAVE_ROLE_STATE} from './constant'
import * as type from './constant'
export default {
  async handleText({commit, state}, text){
      
  },
  async setMerchId({commit,state}, text){
      commit(type.MERCH_ID,text);
  }
}
