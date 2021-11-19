#!/bin/sh -l

echo "Checking Repo: $1!"
echo "bots?: $2!"
echo "writing to: $3!"

time=$(date)
echo "::set-output name=time::$time"
