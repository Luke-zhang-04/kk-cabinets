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

"$bin"/prettier scss/ public/*.html -w

stylelint scss/*."{scss,css}" --fix &
eslint src/**/*."{ts,tsx}" --fix &

wait
