#!/bin/bash
echo "Auditoria de processos Node.js - $(date)" > processos.log
ps aux | grep node >> processos.log
