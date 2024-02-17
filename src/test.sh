#!/bin/bash

# "set -e" makes the script exit on any error
set -e

# "set -x" makes the script print out each command before printing the output
set -x

# The `-w "\n"' argument adds a new line to the end of curl's output
#curl -w "\n" localhost:8000/api/v1/deal

curl -w "\n" -X POST localhost:8000/api/v2/deck/new

new_deck_return=$(curl -w "\n" -X POST localhost:8000/api/v2/deck/new)
deck_id=$(echo "$new_deck_return" | jq -r '.deck_id') #sets deck_id to the id
echo "New Deck ID: $deck_id"

curl -w "\n" localhost:8000/api/v2/deck/$deck_id #deck is successfully found in the dictionary
curl -w "\n" -X POST "localhost:8000/api/v2/deck/$deck_id/deal?count=26"
curl -w "\n" -X POST "localhost:8000/api/v2/deck/$deck_id/deal?count=26"
#52 cards are dealt, and are all shuffled up
curl -w "\n" -X POST "localhost:8000/api/v2/deck/$deck_id/deal?count=1" #already dealt all the cards, so it desplays the error


# You may want to parse the resulting JSON. The `jq` command is good
# for that. You can install it with `apt` in Linux or homebrew in
# Mac. I've commented out the following lines in case you don't have
# it installed.

# The `-s` option makes curl silence it's status output when piping
# The `-r` option to jq makes it return a string without quotes
#curl -s -w "\n" -X POST localhost:8000/api/v2/deck/new | jq -r .message


