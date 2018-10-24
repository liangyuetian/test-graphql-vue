import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

const httpLink = new HttpLink({
	// 你需要在这里使用绝对路径
	uri: './graphql',
	credentials: 'same-origin'
	/* 这个属性的意思是在同源的情况下携带cookie,因为vue-apollo本身发送的是一个fetch请求，所以在发送请求时不会自动携带cookie，所以我们需要加上此属性 */
});

// 创建 apollo 客户端
const apolloClient = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
	connectToDevTools: true
});
const apiClient = new ApolloClient({
	link: new HttpLink({
		// 你需要在这里使用绝对路径
		uri: './apollo',
		credentials: 'same-origin'
		/* 这个属性的意思是在同源的情况下携带cookie,因为vue-apollo本身发送的是一个fetch请求，所以在发送请求时不会自动携带cookie，所以我们需要加上此属性 */
	}),
	cache: new InMemoryCache(),
	connectToDevTools: true
});

const apolloProvider = new VueApollo({
	defaultClient: apolloClient,
	defaultOptions: {
		// 将应用于组件中的所有查询的 apollo 选项
		$query: {
			loadingKey: 'loading',
			fetchPolicy: 'cache-and-network'
		}
	},
	// { [key: string]: ApolloClient<{}> }
	clients: {
		api: apiClient //需要添加请求头
		// base: baseClient   //不需要添加请求头
	}
});

// 安装 vue 插件
Vue.use(VueApollo);

export default apolloProvider;
