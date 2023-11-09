

function CarouselCtrl({ id, leng }) {
    return (
        <>

            <div class="carousel-indicators mt-0 mb-0">
                {
                    Array.from({ length: parseInt(leng) }).map((item, index) => (
                        <button type="button" data-bs-target={`#${id}`} data-bs-slide-to={index} class={index === 0 && "active"}></button>
                    ))
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </>
    )
}


export default CarouselCtrl