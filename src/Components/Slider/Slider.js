import React, {useState,useEffect} from 'react'
import './Slider.css'
import BtnSlider from './BtnSlider'

import axios from "axios"



export default function Slider() {

    const [slideIndex, setSlideIndex] = useState(1)
    const [dataSlider, setDataslider] = useState([])


    const nextSlide = () => {
        if(slideIndex !== dataSlider.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === dataSlider.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    useEffect(() => {

        axios.get("https://testimonialapi.toolcarton.com/api")
        .then(function (response) {
            // handle success
            console.log(response);
        setDataslider(response.data)

        console.log(dataSlider);
            })
    
        
            
            
    }, [])

    return (
   
        <div className="container-slider" style={{display:'flex',justifyContent:"space-between",flexDirection:'column'}}>
            {dataSlider.map((obj, index) => {
                return (
                    <div
                    key={obj.id}
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    style={{display:'flex',flexDirection:"column"}}>
                   <span style={{fontWeight: "bold"}}>Testimonials</span> 
                    <div className="insideSlide"><h2>{obj.message}</h2></div>
                      <div className="insideSlide"><p>{obj.lorem}</p></div>  
                        <div className="insideSlide"><p><span style={{fontWeight: "bold"}}>{obj.name}</span>, {obj.designation}</p></div>
                    </div>
                )
            })}
            

            <div className="container-dots" style={{display:'flex',justifyContent:"space-between", flexWrap:"wrap"}}>
                {dataSlider.map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "slider slider active" : "slider"}
                    ><img src={item.avatar}></img></div>
                ))}
            </div>
            <div>
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>
            </div>
            
        </div>
    )
}
