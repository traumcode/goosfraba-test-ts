![Capture](https://user-images.githubusercontent.com/70107862/145118660-ce5b5482-bf4a-4d41-b51b-55b8f0a43178.PNG)

# Goosfraba Test App

A small app that fetches a list of posts from a GraphQL API and displays a chart representing the number of posts created in each month of 2019.

# Installation and Setup Instructions

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Clone down the repository. You will need **node** and **npm** installed globally on your machine.

Installation:

### npm install

After the dependencies are installed you must run:

### **npm start**

And then go to *http://localhost:3000*

## Technologies used:

- **GraphQL** - for data query and manipulation
- **Apollo Client** - for managing the data from GraphQL
- **Chart.js** - for the data visualization



This is a simple app that I had to finish for Goosfraba after the interview I had with them.

At first I tried to write this project in JavaScript and use the chart from Airbnb, namely visx butt because this was the first time I was working with a chart in Javascript, visx seemed a bit difficult so I decided to use chart.js. Along the way I encountered some problems that made me start a new project in TypeScript.

The problems where based on the syntax, because I could not use the syntax I needed to  write the chart in JavaScript, only in TypeScript 



## Steps taken

1. I started cleaning up the project deleting all the unnecessary components and lines of code.

```diff
- setupTests.ts
- reportWebVitals.ts
- logo.svg
- index.css
- App.test.tsx
- robots.txt
- manifest.json
- public/logo512.png
- public/logo192.png
- public/favicon.ico 
```

2. I installed all the **dependencies** I need in order to start writing the project.

```typescript
"chart.js": "^3.6.0",
"faker": "5.5.3",
"react-chartjs-2": "^4.0.0",
"apollo-server": "^3.5.0",
"graphql": "^15.8.0",
"@apollo/client": "^3.5.5",
```



3. I wrote only a small css file with just the things I need: 

	```css
	@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap');
	*{
	  box-sizing: border-box;
	  margin: 0;
	  padding: 0;
	  font-family: Raleway, serif;
	  }
	```

	

4. I changed the strict mode in the tsconfig: 

	```typescript
	"strict": false -> "strict": true
	```



5. I started configure the **Appollo client** in the **App.tsx.**

First I configured the errors and after that the client. Then I wrapped everything in the **ApolloProvider** . 

```typescript
function App() {
   return (
      <ApolloProvider client={client}>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Main client={client}/>}/>
            </Routes>
         </BrowserRouter>
      </ApolloProvider>
   );
}
```



6. I created a new component named **Chart.tsx** where I wrote the logic for my chart.
7. I created a new TS file where I wrote the query for the **GraphQL**.
8. I started writing the logic in the **Main.tsx** combining everything I previously  wrote . Basically this was the logic for the chart:

```typescript
   const labels = const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

   const data = {
	 labels,
	 datasets: [
	    {
		  label: 'Post of 2019',
		  data: stats.map((stat) => stat.count),
		  backgroundColor: 'rgba(255, 99, 132, 0.5)',
	    },
	 ],
   };
```

Where data is an array with 12 numbers, each number represents the number of posts created in that month.

9. *stats*  is an array which is updating using useState after I fetched all the data from graphQL using the query.

```typescript
props.client.query({query: LOAD_POSTS(count)}).then((result: any) => {........} setStats(Object.keys(stats).map((key) => {...........}
```

and then I just sort the array just to get each number aligned with the months in lables array.

```typescript
sort((a,b) => a.monthNumber - b.monthNumber))
```



And that’s it! 

Thank you Goosfraba for this opportunity. It was really helpful and fun ! 
