npx sass sass:css

if [ "$XDG_SESSION_TYPE" = "wayland" ]; then
    npx electron . --ozone-platform=wayland
elif [ "$XDG_SESSION_TYPE" = "x11" ]; then
    npx electron .
else
    echo "Unknown session type"
fi