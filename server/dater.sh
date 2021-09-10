#!/bin/bash
# create date file
cat > /root/thdash/tiddlers/DayCheck.tid << EOF
title: DayCheck
tag: robot
today: $(date +%B\ %d,\ %Y)
EOF