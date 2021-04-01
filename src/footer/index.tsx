/**
 * KK Cabinets
 * @copyright 2020 - 2021 Luke Zhang, Ethan Lim
 * @author Luke Zhang, Ethan Lim
 *
 * https://luke-zhang-04.github.io
 * https://github.com/ethanlim04
 *
 * @license GPL-3.0-or-later
 */

import * as DeStagnate from "destagnate/lib/createElementOnly"

document.querySelector("footer.page-footer")?.appendChild(
    <div>
        <div class="container-fluid text-center text-md-left">
            <div class="row">
                <div class="col-md-6 mt-md-0 mt-3">
                    <h5 class="text-uppercase">KK Cabinets</h5>
                    <p>
                        <b>Business Hours</b>
                        <br />
                        Monday to Friday . . . . . 10 am - 5 pm
                        <br />
                        Saturday . . . . . . . . . . . . . . 10 am - 2 pm
                    </p>
                    <p>
                        <b>Other times available by appointment</b>
                    </p>
                    <p>
                        <b>Address:</b> 486 Weber Street North, Waterloo, Ontario
                    </p>
                </div>

                <hr class="clearfix w-100 d-md-none pb-3" />

                <div class="col-md-3 mb-md-0 mb-3">
                    <h5 class="text-uppercase">Navigation</h5>

                    <ul class="list-unstyled">
                        <li>
                            <a href="index.html">Home</a>
                        </li>
                        <li>
                            <a href="about.html">About</a>
                        </li>
                        <li>
                            <a href="gallery.html">Gallery</a>
                        </li>
                        <li>
                            <a href="countertops.html">Countertops</a>
                        </li>
                        <li>
                            <a href="testimonials.html">Testimonials</a>
                        </li>
                    </ul>
                </div>

                <div class="col-md-3 mb-md-0 mb-3">
                    <h5 class="text-uppercase">Contact</h5>
                    <ul class="list-unstyled">
                        <li>
                            <p style="margin-block-end: 0;">
                                <i class="material-icons">phone</i> (519) 578-9123
                            </p>
                        </li>
                        <li>
                            <a style="color: white" href="mailto:info@kkcabinets.ca">
                                <i class="material-icons">email</i> info@kkcabinets.ca
                            </a>
                        </li>
                        <li>
                            <a style="color: white" href="mailto:kkcabinets2000@gmail.com">
                                <i class="material-icons">email</i> kkcabinets2000@gmail.com
                            </a>
                        </li>
                        <li>
                            <a style="color: white" href="https://www.facebook.com/kkcabinetskw/">
                                <i class="fab fa-facebook-square fa-lg" /> kkcabinetskw
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="footer-copyright text-center py-3">
            Copyright © 2020 - 2021{" "}
            <a href="https://luke-zhang-04.github.io/" class="text-info">
                Luke Zhang
            </a>
            ,{" "}
            <a href="https://github.com/ethanlim04" class="text-info">
                Ethan Lim
            </a>
            .
        </div>
        <div class="text-center py3">
            <a
                href="https://github.com/Luke-zhang-04/kk-cabinets/blob/master/LICENSE"
                class="text-info"
                target="_blank"
                rel="noopener noreferrer"
            >
                Terms of use
            </a>
        </div>
    </div>,
)
