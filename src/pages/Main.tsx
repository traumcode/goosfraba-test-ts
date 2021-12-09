import React, {useEffect, useState} from 'react';
import styles from './Main.module.css';
import {LOAD_POSTS} from '../graphQL/Queries';
import {Chart} from '../chart/Chart'

function Main(props) {
   const [stats, setStats] = useState([]);


   function getPosts(count: any) {
	 props.client.query({query: LOAD_POSTS(count)}).then((result: any) => {
	    let stats = {};
	    result.data.allPosts.map((post) => {
		  let result = {...post, t:new Date(+post.createdAt)}
		  result.month = result.t.toLocaleString('default', { month: 'long' });
		  result.monthNumber = result.t.getMonth();
		  if(!stats[result.month]){
			stats[result.month] = {
			   monthNumber: result.monthNumber,
			   value: 1
			}
		  } else {
			stats[result.month].value++;
		  }
		  return result
	    });
	    setStats(Object.keys(stats).map((key) => {
		  return {
			month: key,
			monthNumber: stats[key].monthNumber,
			count: stats[key].value
		  }
	    }).sort((a,b) => a.monthNumber - b.monthNumber))

	 }).catch((error) => console.log(JSON.stringify(error, null, 2)))
   }


   useEffect(() => {
	 getPosts(100)
   }, [])

   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   // const labels = stats.map((stat) => stat.month)

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
   return (
	 <div className={styles.container}>
	    <h1>CHART</h1>
	    <Chart data={data}/>
	 </div>
   )
}

export default Main;