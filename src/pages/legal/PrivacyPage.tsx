import React from 'react';
import { XtgAppLayout } from '../../layouts/XtgAppLayout';
import { XtgPage } from '../../components/layout/XtgPage';
import { XtgCard } from '../../components/ui/XtgCard';
import { AppFooter } from '../../components/layout/AppFooter';

export const PrivacyPage: React.FC = () => {
  return (
    <XtgAppLayout>
      <XtgPage
      title="Privacy Policy / Política de Privacidad"
      subtitle="xTheGospel / For The Gospel"
      badge="Legal"
    >
      <div className="xtg-section xtg-stack-lg">

        <XtgCard title="1. Purpose of this app / Propósito de esta aplicación">
          <p>
            <strong>English.</strong> xTheGospel / For The Gospel is a private
            tool designed to support investigators, missionaries, members and
            local leaders of The Church of Jesus Christ of Latter-day Saints.
            It is not an official app of the Church. We do not sell or share
            your personal information with third parties for advertising
            purposes.
          </p>
          <p>
            <strong>Español.</strong> xTheGospel / For The Gospel es una
            herramienta privada diseñada para apoyar a investigadores,
            misioneros, miembros y líderes locales de La Iglesia de Jesucristo
            de los Santos de los Últimos Días. No es una aplicación oficial de
            la Iglesia. No vendemos ni compartimos tu información personal con
            terceros para fines de publicidad.
          </p>
        </XtgCard>

        <XtgCard title="2. Data we collect / Datos que recopilamos">
          <p>
            <strong>English.</strong> We only collect the minimum information
            necessary to provide the service, such as:
          </p>
          <ul>
            <li>Account data (name, email, language, role in the app).</li>
            <li>
              Spiritual notes and journal entries you voluntarily write
              (experiences, commitments, progress).
            </li>
            <li>
              Basic teaching and coordination information (lessons, agendas,
              non-confidential notes about investigators and members).
            </li>
            <li>Technical data (device, browser, usage logs) for security and performance.</li>
          </ul>

          <p>
            <strong>Español.</strong> Solo recopilamos la información mínima
            necesaria para prestar el servicio, por ejemplo:
          </p>
          <ul>
            <li>Datos de cuenta (nombre, correo, idioma, rol en la app).</li>
            <li>
              Notas espirituales y entradas de diario que tú mismo registras
              (experiencias, compromisos, progreso).
            </li>
            <li>
              Información básica de enseñanza y coordinación (lecciones, agendas,
              notas no confidenciales sobre investigadores y miembros).
            </li>
            <li>
              Datos técnicos (dispositivo, navegador, registros de uso) para
              seguridad y rendimiento.
            </li>
          </ul>
        </XtgCard>

        <XtgCard title="3. Sensitive and confidential information / Información sensible y confidencial">
          <p>
            <strong>English.</strong> We intentionally avoid collecting or
            storing confidential or highly sensitive information, such as:
            temple information, disciplinary matters, tithing, worthiness
            interviews, or any data marked as "confidential" in Church
            handbooks. Leaders using the app must follow the General Handbook
            and never enter information that should remain strictly confidential.
          </p>
          <p>
            <strong>Español.</strong> Evitamos intencionalmente recopilar o
            guardar información confidencial o altamente sensible, tales como:
            información del templo, asuntos disciplinarios, diezmo, entrevistas
            de dignidad o cualquier dato marcado como "confidencial" en los
            manuales de la Iglesia. Los líderes que usen la aplicación deben
            seguir el Manual General y nunca registrar información que deba
            permanecer estrictamente confidencial.
          </p>
        </XtgCard>

        <XtgCard title="4. Storage and security / Almacenamiento y seguridad">
          <p>
            <strong>English.</strong> xTheGospel uses Google Firebase and/or
            Firestore to store data. These services provide encryption at rest
            and in transit, access control via security rules, and hardened
            infrastructure maintained by Google Cloud. Access to data is
            restricted by role and mission context as configured in the app.
          </p>
          <p>
            <strong>Español.</strong> xTheGospel utiliza Google Firebase y/o
            Firestore para almacenar los datos. Estos servicios ofrecen cifrado
            en reposo y en tránsito, control de acceso mediante reglas de
            seguridad e infraestructura protegida mantenida por Google Cloud.
            El acceso a los datos se limita por rol y contexto de misión según
            la configuración de la aplicación.
          </p>
        </XtgCard>

        <XtgCard title="5. How we use the data / Cómo usamos los datos">
          <p>
            <strong>English.</strong> We use your data only to:
          </p>
          <ul>
            <li>Provide and improve app features.</li>
            <li>Track spiritual commitments and lesson progress.</li>
            <li>Generate non-confidential reports for local coordination.</li>
            <li>Protect the security and integrity of the service.</li>
          </ul>
          <p>
            <strong>Español.</strong> Usamos tus datos solamente para:
          </p>
          <ul>
            <li>Prestar y mejorar las funciones de la app.</li>
            <li>Registrar compromisos espirituales y progreso en las lecciones.</li>
            <li>
              Generar reportes no confidenciales para la coordinación local.
            </li>
            <li>Proteger la seguridad e integridad del servicio.</li>
          </ul>
        </XtgCard>

        <XtgCard title="6. Data sharing / Compartición de datos">
          <p>
            <strong>English.</strong> We do not sell your data. Limited data may
            be shared only in these cases:
          </p>
          <ul>
            <li>
              With your companion or local leaders inside the app, according to
              your role and mission settings.
            </li>
            <li>
              With service providers strictly necessary to operate the app (for
              example Firebase/Google Cloud).
            </li>
            <li>If required by law, after proper legal process.</li>
          </ul>
          <p>
            <strong>Español.</strong> No vendemos tus datos. Solo podríamos
            compartir datos en estos casos:
          </p>
          <ul>
            <li>
              Con tu compañero o líderes locales dentro de la app, según tu rol
              y la configuración de la misión.
            </li>
            <li>
              Con proveedores de servicio estrictamente necesarios para operar la
              app (por ejemplo Firebase/Google Cloud).
            </li>
            <li>Si la ley lo exige, después del debido proceso legal.</li>
          </ul>
        </XtgCard>

        <XtgCard title="7. Children and youth / Niños y jóvenes">
          <p>
            <strong>English.</strong> This app is designed for use under the
            supervision of parents and Church leaders. If you believe we have
            collected personal data from a child without appropriate consent,
            please contact us so we can delete it.
          </p>
          <p>
            <strong>Español.</strong> Esta aplicación está pensada para usarse
            bajo la supervisión de padres y líderes de la Iglesia. Si crees que
            hemos recopilado datos personales de un menor sin el consentimiento
            adecuado, contáctanos para eliminarlos.
          </p>
        </XtgCard>

        <XtgCard title="8. Your rights / Tus derechos">
          <p>
            <strong>English.</strong> You may request access, correction or
            deletion of your personal data stored in the app, subject to
            technical and legal limitations.
          </p>
          <p>
            <strong>Español.</strong> Puedes solicitar acceso, corrección o
            eliminación de tus datos personales almacenados en la app, sujeto a
            las limitaciones técnicas y legales aplicables.
          </p>
        </XtgCard>

        <XtgCard title="9. Contact / Contacto">
          <p>
            <strong>English.</strong> For any privacy question, please contact:
            <br />
            <em>[your support email here]</em>
          </p>
          <p>
            <strong>Español.</strong> Para cualquier consulta sobre privacidad,
            por favor escribe a:
            <br />
            <em>[tu correo de soporte aquí]</em>
          </p>
        </XtgCard>

        <XtgCard title="10. Changes / Cambios">
          <p>
            <strong>English.</strong> We may update this Privacy Policy from
            time to time. Changes will be announced inside the app and will be
            effective from the date indicated.
          </p>
          <p>
            <strong>Español.</strong> Podemos actualizar esta Política de
            Privacidad periódicamente. Los cambios se anunciarán dentro de la
            app y entrarán en vigor a partir de la fecha indicada.
          </p>
        </XtgCard>

      </div>
      <AppFooter />
    </XtgPage>
    </XtgAppLayout>
  );
};

