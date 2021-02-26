if (typeof window !== `undefined`) {
    const lordiconelement = require('lord-icon-element');
    const lottie = require('lottie-web');
}
import React from 'react';

// register lottie and define custom element
if (typeof window !== `undefined`) {
lordiconelement.defineLordIconElement(lottie.loadAnimation);
}

export default function LordIcon({src, trigger="loop", delay ="2500"}) {
    return (
<lord-icon trigger={trigger} delay={delay} src={src}></lord-icon>
    )
}
