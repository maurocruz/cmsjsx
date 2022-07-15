import React from "react";
import { Icon } from "@iconify/react";

// ARROW BACK
const IconArrowBack = ({className = '', style = {}}) => { return <Icon icon="bx:arrow-back" className={className} style={style} /> }

// LOADING
const IconLoading = ({className = '', style = {}}) => { return <Icon icon="eos-icons:loading" className={className} style={style} /> }

// BACKWARD ARROW
const IconBackward = ({className = '', style = {}}) => ( <Icon icon="zondicons:backward" className={className} style={style} /> );

// FORWARD ARROW
const IconForward = ({className = '', style = {}}) => ( <Icon icon="zondicons:forward" className={className} style={style} /> );

// FROWARD STEP ARROW
const IconForwardStep = ({className = '', style = {}}) => ( <Icon icon="zondicons:forward-step" className={className} style={style} /> );

export { IconLoading, IconBackward, IconForward, IconForwardStep, IconArrowBack };
