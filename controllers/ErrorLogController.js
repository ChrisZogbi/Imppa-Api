var express = require('express');
import addLogErrores from '../services/LogErroresService';

export function LogError(LugarError, Mensaje) {
    addLogErrores(LugarError, Mensaje);
} 