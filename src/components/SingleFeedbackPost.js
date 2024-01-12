/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "../index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect,useState } from "react";
import { Card, CardBody, CardFooter, Heading, Image, Stack } from "@chakra-ui/react";
import { encrypt,decrypt } from "n-krypta";
import { Share } from "react-twitter-widgets";
import Customtweet from "./Customtweet";
import { renderToString } from 'react-dom/server';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';



// import { FacebookShareButton } from 'react-simple-share';


const SECRET_KEY='ABC'

function SingleFeedbackPost({ item, ImgLinks, addressLinks }) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);




  const formatTimestamp = (timestamp) => {
    const date = timestamp ? new Date(timestamp) : null;

    if (date) {
      // Set options for formatting
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Kolkata",
      };

      const formattedDateTime = date.toLocaleString("en-IN", options);
      return formattedDateTime;
    }

    return "N/A";
  };

  return (
    <div data-aos="fade-up" id='feedback'>
      <Card 
        direction={{base: 'column', sm: 'row'}}  
        overflow='hidden'
        variant='outline'
        className="my-4 mx-10 md:mx-20 rounded-2xl shadow-md hover:scale-105 duration-300"
        background='#F0F0F0'
        borderRadius='[20px]'
        border={"solid"}
        borderColor={"#8C4E1D"}
      >
        <Image 
          objectFit='cover'
          maxW={{base:'100%', sm:'30%'}}
          src={ImgLinks.get(item.policeStation)}
          alt={`${item.name} Police Station Picture`}
        />

        <Stack>
          <CardBody>
            <Heading size='md'>{item.policeStation}</Heading>
            <p className="py-2">
              <span className="font-semibold">Address </span>{addressLinks.get(item.policeStation)}
            </p>
            <p className="py-2">
            <span className="font-semibold">Reporting Date & Time - </span>{formatTimestamp(item.created_at)}
            </p>
          </CardBody>
          <CardFooter>
            <div>
              <p className="font-semibold">Feedback:</p>
              <p className={` ${
            item.Feel < 0 ? "text-red-600" : "text-green-700"
            }`}>{decrypt(item.feedback,toString(process.env.SECRET_KEY))}</p>
        <blockquote>
            <Share  className='tweet' url="https://feedback-system-police-private.vercel.app/" options={{text:`Here is the Summary of my recent visit to  the Police station ${item.policeStation}:\n  My Purpose:${item.name} \n My Feedback:${decrypt(item.feedback,toString(process.env.SECRET_KEY))}\n @${item.policeStation} \n #${item.policeStation} #RajasThanPolice } \n`,size: "large"}}
></Share>

</blockquote>

            </div>


   

          </CardFooter>
          
        </Stack>
        
      </Card>
    </div>
  );
}

export default SingleFeedbackPost;
