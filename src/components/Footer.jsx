import { useLanguage } from '../i18n'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-islamic-dark dark:bg-gray-800 text-white mt-auto border-t border-islamic-green/20 dark:border-green-700/50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-5">
        <p className="text-islamic-beige dark:text-gray-300 text-center text-sm">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  )
}

export default Footer

