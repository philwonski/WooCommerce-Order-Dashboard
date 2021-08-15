#!/bin/bash
# rclone script
rclone copy --update --ignore-size --ignore-times --ignore-existing --ignore-checksum -v woobucket:thdorders /root/server/tiddlers