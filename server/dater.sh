#!/bin/bash
# create date file
cat > /root/server/tiddlers/DayCheck.tid << EOF
title: DayCheck
tag: robot
today: $(date +%B\%e,\ %Y)
EOF