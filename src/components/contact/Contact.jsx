import React from 'react'
import styles from './Contact.module.css'
import { portfolioData } from '../../data/portfolioData'

export default function Contact() {
  const { contact } = portfolioData

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.sectionHeader}>
        <div className="uppercase-spaced">C O N N E C T</div>
      </div>

      <div className={styles.connectGrid}>
        {/* Left Column: Social Links with Arrows */}
        <div className={styles.socialColumn}>
          <a 
            href={contact.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialLink}
          >
            <span className={styles.arrow}>→</span>
            <span className={styles.label}>GITHUB</span>
          </a>
          <a 
            href={contact.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialLink}
          >
            <span className={styles.arrow}>→</span>
            <span className={styles.label}>LINKEDIN</span>
          </a>
          <a 
            href={contact.instagram} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialLink}
          >
            <span className={styles.arrow}>→</span>
            <span className={styles.label}>INSTAGRAM</span>
          </a>
        </div>

        {/* Right Column: Direct Contact Details */}
        <div className={styles.detailsColumn}>
          <div className={styles.contactGroup}>
            <div className={styles.groupLabel}>GET IN TOUCH</div>
            <a href={`mailto:${contact.email}`} className={styles.groupValue}>
              {contact.email}
            </a>
          </div>

          <div className={styles.contactGroup}>
            <div className={styles.groupLabel}>PHONE</div>
            <a href={`tel:${contact.phone}`} className={styles.groupValue}>
              {contact.phone}
            </a>
          </div>

          <div className={styles.contactGroup}>
            <div className={styles.groupLabel}>LOCATION</div>
            <div className={styles.locationValue}>
              {contact.location}
            </div>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span>Vaibhav Kandpal</span>
        </div>
        <div className={styles.footerRight}>
          <span>since 2025</span>
        </div>
      </footer>
    </section>
  )
}
