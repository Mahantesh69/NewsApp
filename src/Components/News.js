// import React, {useEffect, useState} from "react";
// import Newsitems from "./Newsitems";
// import Loading from "./Loading";
// import InfiniteScroll from "react-infinite-scroll-component";

// const News = (props) => {
//   const [articles, setArticles] = useState([])
//   const [page, setPage] = useState(1)
//   const [loading, setLoading] = useState(true)
//   const [totalResults, setTotalResults] = useState(0)
//   // document.title = `${CapitilizeLetter(props.category)} - News`;


//   const CapitilizeLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   const UpdateNews = async () => {
//     props.setProgress(10)
//     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}
//     &apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
//     setLoading(true)
//     let data = await fetch(url);
//     props.setProgress(30)
//     let parsedData = await data.json();
//     props.setProgress(70)
//     setArticles(parsedData.articles)
//     setTotalResults(parsedData.totalResults)
//     setLoading(false)
//     props.setProgress(100)
//   }

//   useEffect(()=>{
//     UpdateNews()
//   })
  
//   // handleNextClick = async () => {
//   //   setState({ page:page + 1 });
//   //   UpdateNews();
//   // };

//   // handlePrevClick = async () => {
//   //   setState({
//   //     page: page - 1,
//   //   });
//   //   UpdateNews();
//   // };
//   const fetchMoreData = async () => {
    
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}
//     &apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
//     setPage(page+1)
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     setArticles(articles.concat(parsedData.articles))
//     setTotalResults(parsedData.totalResults)
//   };
 
//     return (
//       <>
//         <h1 className="my-4">
//           Top HeadLines - {CapitilizeLetter(props.category)}</h1>
//         {loading && <Loading/>}

//         <InfiniteScroll
//           dataLength={articles.length}
//           next={fetchMoreData}
//           hasMore={articles.length !== totalResults}
//           loader={<Loading />}
//         >
//           <div className="container">
//             <div className="row my-3 text-center">
//               {articles.map((element) => {
//                 return (
//                   <div className="col-md-4" key={element.url}>
//                     <Newsitems
//                       title={element.title}
//                       description={element.description}
//                       imageUrl={element.urlToImage}
//                       newsUrl={element.url}
//                       author={element.author}
//                       date={element.publishedAt}
//                       source={element.source.name}
//                     />
//                   </div>
//                 );
//               })}
          

//             </div>
//           </div>
//         </InfiniteScroll>
//       </>
//     );
//   }

// News.defaultProps = {
//   country:"in",
//   pageSize:8,
//   category:'general'
// }

// // News.propTypes={
// //   country: propTypes.string,
// //   pageSize:propTypes.number,
// //   category:propTypes.string,
// // }

// export default News

import React, {useEffect, useState} from "react";
import Newsitems from "./Newsitems";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews(); 
        // eslint-disable-next-line
    }, [])


    const fetchMoreData = async () => {   
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1) 
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };
 
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Loading />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Loading/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

// News.propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
// }

export default News