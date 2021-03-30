
import lottie from 'lottie-web';
import React from 'react';

export default function LordIcon({ src, trigger = "loop", delay = "2500" }) {
    if (typeof window !== `undefined`) {
        const lordiconelement = require('lord-icon-element');
        lordiconelement.defineLordIconElement(lottie.loadAnimation);
        return (
            <lord-icon trigger={trigger} delay={delay} src={src}></lord-icon>
        )
    }
    return <div></div>
}
