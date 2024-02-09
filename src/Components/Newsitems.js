import React from "react";

const Newsitems = (props) => {
    let { imageUrl, description, title, newsUrl, author, date, source } = props;

    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left:'80%', zIndex:'1'}}>
            {source}</span>
          <img src={imageUrl?imageUrl:"https://i.ytimg.com/vi/w-qrltcwL1c/maxresdefault.jpg"} className="card-img-top" alt="images" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>

            <p className="card-text">{description}</p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Read more
            </a>
            <p className="card-text">
              by {author} on {new Date(date).toGMTString()}
            </p>
          </div>
        </div>
      </div>
    );
  }

export default Newsitems
