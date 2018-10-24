### 总结

#### 添加插件

```js
npm install -S vue-apollo graphql apollo-client apollo-link apollo-link-http apollo-cache-inmemory graphql-tag apollo-link-context
```

#### 引入依赖包

```js
import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

```

#### 首先创建默认客户端
```js
const apolloClient = new ApolloClient({
	link: new HttpLink({
        // 你需要在这里使用绝对路径
        uri: '/default/api',
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
	}
});

// 安装 vue 插件
Vue.use(VueApollo);

// 最后
new Vue({
	router,
	store,
	apolloProvider,
	render: (h) => h(App)
}).$mount('#app');

```

#### 接口肯定不止一个，那个需要创建多个客户端
```js

```