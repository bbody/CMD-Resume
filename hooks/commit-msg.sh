echo "$(echo $1 | head -c 1)"
echo $1
if [$initial -eq ':']
then
	echo ":pencil: $1"
else
	echo "$1"
fi

