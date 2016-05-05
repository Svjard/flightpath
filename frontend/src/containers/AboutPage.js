import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import '../styles/about-page.css';

const AboutPage = () => {
    return (
      <div>
        <p>
        Flight Path is an open-source, free-to-play, online regional airline simulation. It allows users to experience
        the dynamics of owning and operating a regional airline such as dealing with aircraft purchases and maintence,
        nation-wide weather, corporate taxes, and various economic factors.
        </p>
        <p>Author: <strong>Marc Fisher</strong></p>
        <p>
        Released under the MIT license.
        </p>
        <p>
        Code is available at <a href="https://github.com/Svjard/flightpath">Github</a>
        </p>
        <div className="release-history">
          <h1 className="history">History</h1>
          <div className="releases">
            <div className="release">
              <h3>Version 1.0.0 <span>(2016-05-03)</span>:</h3>
              <ul>
                <li>
                  Initial BETA release to the public. Enjoy!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AboutPage;
