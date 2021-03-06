#!/bin/bash
# KK Cabinets
# Copyright (C) 2020  Luke Zhang, Ethan Lim
#
# https://luke-zhang-04.github.io
# https://github.com/ethanlim04
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

bin="./node_modules/.bin"

build() {
    echo "Compiling with sass"
    "$bin"/sass scss/:build/css --style compressed --no-source-map &

    echo "Bundling with Rollup"
    "$bin"/rollup -c rollup.config.js &

    wait

    echo "Moving assets"
    cp -rv public/pictures build

    echo "Minifying with html-minifer"
    for file in public/*.html; do
        "$bin"/html-minifier --config-file .htmlminifier.json "$file" -o build/"$(basename "$file")" &
    done
}

buildDev() {
    if [[ $(echo "scss:$(tar cf - scss | shasum -a 384)" | node buildInfo.js) == 1 ]]; then
        # Compile SASS
        echo -e "Compiling ./scss/ to ./public/css/ with sass"
        "$bin"/sass scss/:public/css
    else
        echo -e "No changed found in ./scss/"
    fi

    NODE_ENV="dev" "$bin"/rollup -c rollup.config.js
}

if [[ $1 == "-d" ]]||[[ $1 == "--dev" ]]; then
    buildDev
else
    build
fi
