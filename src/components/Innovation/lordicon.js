import { defineLordIconElement } from "lord-icon-element";
import { loadAnimation } from "lottie-web";
import React from 'react';

// register lottie and define custom element
defineLordIconElement(loadAnimation);


export default function LordIcon({src, trigger="loop", delay ="2500"}) {
    return (
<lord-icon trigger={trigger} delay={delay} src={src}></lord-icon>
    )
}
