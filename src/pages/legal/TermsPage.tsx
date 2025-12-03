import React from 'react';
import { XtgAppLayout } from '../../layouts/XtgAppLayout';
import { XtgPage } from '../../components/layout/XtgPage';
import { XtgCard } from '../../components/ui/XtgCard';
import { AppFooter } from '../../components/layout/AppFooter';

export const TermsPage: React.FC = () => {
  return (
    <XtgAppLayout>
      <XtgPage
      title="Terms of Use / Términos de Uso"
      subtitle="xTheGospel / For The Gospel"
      badge="Legal"
    >
      <div className="xtg-section xtg-stack-lg">

        <XtgCard title="1. Not an official Church product / No es un producto oficial de la Iglesia">
          <p>
            <strong>English.</strong> xTheGospel is an independent project
            created to support the work of the gospel. It is not owned,
            operated, or endorsed by The Church of Jesus Christ of Latter-day
            Saints. Always follow the official handbooks and direction from your
            priesthood leaders.
          </p>
          <p>
            <strong>Español.</strong> xTheGospel es un proyecto independiente
            creado para apoyar la obra del evangelio. No pertenece ni está
            operado ni avalado por La Iglesia de Jesucristo de los Santos de los
            Últimos Días. Siempre debes seguir los manuales oficiales y la
            dirección de tus líderes del sacerdocio.
          </p>
        </XtgCard>

        <XtgCard title="2. Appropriate use / Uso apropiado">
          <p>
            <strong>English.</strong> You agree to use the app only for
            righteous, lawful, and church-appropriate purposes. You will not:
          </p>
          <ul>
            <li>Upload offensive, abusive, or illegal content.</li>
            <li>
              Store confidential information that should remain only in
              priesthood interviews or restricted Church systems.
            </li>
            <li>Misuse the app to control, manipulate or shame others.</li>
          </ul>
          <p>
            <strong>Español.</strong> Aceptas usar la app solo para fines justos,
            legales y apropiados para la Iglesia. No vas a:
          </p>
          <ul>
            <li>Subir contenido ofensivo, abusivo o ilegal.</li>
            <li>
              Registrar información confidencial que deba permanecer solo en
              entrevistas del sacerdocio o sistemas restringidos de la Iglesia.
            </li>
            <li>Usar la app para controlar, manipular o avergonzar a otros.</li>
          </ul>
        </XtgCard>

        <XtgCard title="3. Leadership data / Datos de liderazgo">
          <p>
            <strong>English.</strong> Leaders using the leadership module must
            remember that each number represents a real person. Notes and
            comments must be respectful, brief, and purely focused on helping
            investigators and members come closer to Christ, in harmony with the
            General Handbook.
          </p>
          <p>
            <strong>Español.</strong> Los líderes que usan el módulo de
            liderazgo deben recordar que cada número representa a una persona
            real. Las notas y comentarios deben ser respetuosos, breves y
            centrados únicamente en ayudar a investigadores y miembros a acercarse
            a Cristo, en armonía con el Manual General.
          </p>
        </XtgCard>

        <XtgCard title="4. No guarantees / Sin garantías">
          <p>
            <strong>English.</strong> The app is provided "as is", without
            formal guarantees. We will do our best to keep the service stable,
            secure and useful, but we cannot promise uninterrupted access or
            absence of errors.
          </p>
          <p>
            <strong>Español.</strong> La aplicación se ofrece "tal cual", sin
            garantías formales. Haremos lo posible por mantener el servicio
            estable, seguro y útil, pero no podemos prometer acceso
            ininterrumpido ni ausencia total de errores.
          </p>
        </XtgCard>

        <XtgCard title="5. Changes and termination / Cambios y finalización">
          <p>
            <strong>English.</strong> We may update the app, modify features or
            discontinue the service in the future. We may also suspend accounts
            that clearly violate these Terms or abuse other users.
          </p>
          <p>
            <strong>Español.</strong> Podemos actualizar la app, modificar
            funciones o descontinuar el servicio en el futuro. También podemos
            suspender cuentas que violen claramente estos Términos o abusen de
            otros usuarios.
          </p>
        </XtgCard>

        <XtgCard title="6. Acceptance / Aceptación">
          <p>
            <strong>English.</strong> By creating an account or using the app,
            you agree to these Terms of Use and to the Privacy Policy.
          </p>
          <p>
            <strong>Español.</strong> Al crear una cuenta o usar la aplicación,
            aceptas estos Términos de Uso y la Política de Privacidad.
          </p>
        </XtgCard>

      </div>
      <AppFooter />
    </XtgPage>
    </XtgAppLayout>
  );
};

