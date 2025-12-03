import React from 'react';
import { XtgAppLayout } from '../../layouts/XtgAppLayout';
import { XtgPage } from '../../components/layout/XtgPage';
import { XtgCard } from '../../components/ui/XtgCard';
import { AppFooter } from '../../components/layout/AppFooter';

export const SupportPage: React.FC = () => {
  return (
    <XtgAppLayout>
      <XtgPage
      title="Support / Soporte"
      subtitle="Help for using xTheGospel / Ayuda para usar xTheGospel"
      badge="Support"
    >
      <div className="xtg-section xtg-stack-lg">
        <XtgCard title="Contact / Contacto">
          <p>
            <strong>English.</strong> If you need help, found a bug, or have a
            suggestion, please contact:
          </p>
          <p>
            <em>[your support email here]</em>
          </p>
          <p>
            <strong>Español.</strong> Si necesitas ayuda, encontraste un error o
            tienes una sugerencia, por favor escribe a:
          </p>
          <p>
            <em>[tu correo de soporte aquí]</em>
          </p>
        </XtgCard>

        <XtgCard title="Security and data issues / Seguridad y datos">
          <p>
            <strong>English.</strong> If you believe there is a security issue
            or that some data should be deleted or corrected, please contact us
            as soon as possible with the details. We will review the case and
            respond promptly.
          </p>
          <p>
            <strong>Español.</strong> Si crees que existe un problema de
            seguridad o que ciertos datos deben eliminarse o corregirse, por
            favor contáctanos lo antes posible con los detalles. Revisaremos el
            caso y responderemos con rapidez.
          </p>
        </XtgCard>

        <XtgCard title="Spiritual and doctrinal questions / Preguntas espirituales y doctrinales">
          <p>
            <strong>English.</strong> This app does not replace your local
            leaders. For doctrinal questions or spiritual concerns, we invite
            you to speak with your missionaries, bishop, or branch president.
          </p>
          <p>
            <strong>Español.</strong> Esta aplicación no reemplaza a tus líderes
            locales. Para preguntas doctrinales o inquietudes espirituales, te
            invitamos a hablar con tus misioneros, tu obispo o presidente de rama.
          </p>
        </XtgCard>
      </div>
      <AppFooter />
    </XtgPage>
    </XtgAppLayout>
  );
};

