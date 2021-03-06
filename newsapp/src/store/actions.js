// import * as types from './type';
export default {
	showHeader: ({commit}) => {
		commit('showHeader');
	},
	hideHeader: ({commit}) => {
		commit('hideHeader');
	},
	showLoading: ({commit}) => {
		commit('showLoading');
	},
	hideLoading: ({commit}) => {
		commit('hideLoading');
	},
	hideFooter: ({commit}) => {
		commit('hideFooter');
	},
	showFooter: ({commit}) => {
		commit('showFooter');
	}
}