<template>
	<div id="follow">
		<div class="content  mt30">
			<div class="newsList">
				<ul>
					<li v-for="(item, index) in arrList">
						<a href="javascript:">
							<h2>{{ index + 1 }}. {{ item.title }}</h2>
							<p>{{ item.detail }}</p>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				arrList: []
			}
		},
		mounted () {
			// 获取数据
			this.fetchData();
		},
		methods: {
			fetchData () {
				let _this = this;
//                console.log(this.$http);
				this.$http.get('src/data/follow.data').then(function (res) {
					_this.arrList = res.data;
				}).catch(function (err) {
					console.log('Follow', err);
				});
			}
		}
	}
</script>
<style scoped>
	.mt30 {
		margin-top: 30px;
	}
</style>
