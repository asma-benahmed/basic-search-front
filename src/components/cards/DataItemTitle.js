import { Link } from "react-router-dom"; 
 
function DataItemTitle({ search_query, title, courseId }) { 
  const start = title?.toLowerCase().indexOf(search_query?.toLowerCase()); 
  const end = start + search_query?.length - 1; 
  return ( 
    <Link 
      to={`${"/course/" + courseId}`} 
      style={{ color: "inherit", textDecoration: "inherit" }} 
    > 
      <p style={{ fontWeight: "bold", color: "#0F4798" }}> 
        {[...title].map((item, index) => ( 
          <span 
            key={index} 
            style={{ 
              backgroundColor: 
                start >= 0 && index >= start && index <= end 
                  ? "#FDFF99" 
                  : "white", 
            }} 
          > 
            {index < 60 && item} 
          </span> 
        ))} 
        {title.length > 60 && "..."}{" "} 
      </p>
    </Link>
  ); 
} 

export default DataItemTitle; 
