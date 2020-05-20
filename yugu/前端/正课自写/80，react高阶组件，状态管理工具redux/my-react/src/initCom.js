import React from 'react'
import axios from "axios";
React.Component.prototype.http = axios;
React.Component.prototype.bindAll = function (arr) {
    arr.forEach(el => {
        this[el] = this[el].bind(this);
    });
}