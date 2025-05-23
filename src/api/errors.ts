import { ElbeError } from "..";

const _httpErrors = {
  badRequest: {
    code: "HTTP_400",
    message: {
      de: "Ungültige Anfrage",
      en: "Bad Request",
      es: "Solicitud incorrecta",
      fr: "Mauvaise requête",
      it: "Richiesta errata",
      pt: "Solicitação inválida",
    },
    description: {
      de: "Die Anfrage war ungültig oder fehlerhaft.",
      en: "The request was invalid or malformed.",
      es: "La solicitud fue inválida o mal formada.",
      fr: "La requête était invalide ou mal formée.",
      it: "La richiesta era invalida o mal formata.",
      pt: "A solicitação foi inválida ou malformada.",
    },
  } as ElbeError,
  unauthorized: {
    code: "HTTP_401",
    message: {
      de: "Nicht autorisiert",
      en: "Unauthorized",
      es: "No autorizado",
      fr: "Non autorisé",
      it: "Non autorizzato",
      pt: "Não autorizado",
    },
    description: {
      de: "Die Authentifizierung ist erforderlich und fehlgeschlagen.",
      en: "Authentication is required and has failed.",
      es: "Se requiere autenticación y ha fallado.",
      fr: "L'authentification est requise et a échoué.",
      it: "È richiesta l'autenticazione ed è fallita.",
      pt: "A autenticação é necessária e falhou.",
    },
  } as ElbeError,
  paymentRequired: {
    code: "HTTP_402",
    message: {
      de: "Zahlung erforderlich",
      en: "Payment Required",
      es: "Pago requerido",
      fr: "Paiement requis",
      it: "Pagamento richiesto",
      pt: "Pagamento necessário",
    },
    description: {
      de: "Die Zahlung ist erforderlich, um fortzufahren.",
      en: "Payment is required to proceed.",
      es: "Se requiere pago para continuar.",
      fr: "Le paiement est requis pour continuer.",
      it: "È richiesto il pagamento per procedere.",
      pt: "É necessário pagamento para continuar.",
    },
  } as ElbeError,
  forbidden: {
    code: "HTTP_403",
    message: {
      de: "Verboten",
      en: "Forbidden",
      es: "Prohibido",
      fr: "Interdit",
      it: "Vietato",
      pt: "Proibido",
    },
    description: {
      de: "Der Zugriff auf die Ressource ist verboten.",
      en: "Access to the resource is forbidden.",
      es: "El acceso al recurso está prohibido.",
      fr: "L'accès à la ressource est interdit.",
      it: "L'accesso alla risorsa è vietato.",
      pt: "O acesso ao recurso é proibido.",
    },
  } as ElbeError,
  notFound: {
    code: "HTTP_404",
    message: {
      de: "Nicht gefunden",
      en: "Not Found",
      es: "No encontrado",
      fr: "Non trouvé",
      it: "Non trovato",
      pt: "Não encontrado",
    },
    description: {
      de: "Die angeforderte Ressource wurde nicht gefunden.",
      en: "The requested resource was not found.",
      es: "El recurso solicitado no fue encontrado.",
      fr: "La ressource demandée n'a pas été trouvée.",
      it: "La risorsa richiesta non è stata trovata.",
      pt: "O recurso solicitado não foi encontrado.",
    },
  } as ElbeError,
  methodNotAllowed: {
    code: "HTTP_405",
    message: {
      de: "Methode nicht erlaubt",
      en: "Method Not Allowed",
      es: "Método no permitido",
      fr: "Méthode non autorisée",
      it: "Metodo non consentito",
      pt: "Método não permitido",
    },
    description: {
      de: "Die angeforderte Methode ist für die Ressource nicht erlaubt.",
      en: "The requested method is not allowed for the resource.",
      es: "El método solicitado no está permitido para el recurso.",
      fr: "La méthode demandée n'est pas autorisée pour la ressource.",
      it: "Il metodo richiesto non è consentito per la risorsa.",
      pt: "O método solicitado não é permitido para o recurso.",
    },
  } as ElbeError,
  notAcceptable: {
    code: "HTTP_406",
    message: {
      de: "Nicht akzeptabel",
      en: "Not Acceptable",
      es: "No aceptable",
      fr: "Non acceptable",
      it: "Non accettabile",
      pt: "Não aceitável",
    },
    description: {
      de: "Die angeforderte Ressource kann nicht bereitgestellt werden.",
      en: "The requested resource cannot be provided.",
      es: "El recurso solicitado no se puede proporcionar.",
      fr: "La ressource demandée ne peut pas être fournie.",
      it: "La risorsa richiesta non può essere fornita.",
      pt: "O recurso solicitado não pode ser fornecido.",
    },
  },
  proxyAuthenticationRequired: {
    code: "HTTP_407",
    message: {
      de: "Proxy-Authentifizierung erforderlich",
      en: "Proxy Authentication Required",
      es: "Se requiere autenticación de proxy",
      fr: "Authentification proxy requise",
      it: "Autenticazione proxy richiesta",
      pt: "Autenticação de proxy necessária",
    },
    description: {
      de: "Die Authentifizierung beim Proxy-Server ist erforderlich.",
      en: "Authentication with the proxy server is required.",
      es: "Se requiere autenticación con el servidor proxy.",
      fr: "L'authentification auprès du serveur proxy est requise.",
      it: "È richiesta l'autenticazione con il server proxy.",
      pt: "A autenticação com o servidor proxy é necessária.",
    },
  },
  requestTimeout: {
    code: "HTTP_408",
    message: {
      de: "Zeitüberschreitung der Anfrage",
      en: "Request Timeout",
      es: "Tiempo de espera de la solicitud",
      fr: "Délai d'attente de la requête",
      it: "Timeout della richiesta",
      pt: "Tempo limite da solicitação",
    },
    description: {
      de: "Die Anfrage hat zu lange gedauert und wurde abgebrochen.",
      en: "The request took too long and was aborted.",
      es: "La solicitud tardó demasiado y fue abortada.",
      fr: "La requête a pris trop de temps et a été annulée.",
      it: "La richiesta ha impiegato troppo tempo ed è stata annullata.",
      pt: "A solicitação demorou muito e foi abortada.",
    },
  },

  conflict: {
    code: "HTTP_409",
    message: {
      de: "Konflikt",
      en: "Conflict",
      es: "Conflicto",
      fr: "Conflit",
      it: "Conflitto",
      pt: "Conflito",
    },
    description: {
      de: "Die Anfrage steht im Konflikt mit dem aktuellen Zustand der Ressource.",
      en: "The request conflicts with the current state of the resource.",
      es: "La solicitud entra en conflicto con el estado actual del recurso.",
      fr: "La requête est en conflit avec l'état actuel de la ressource.",
      it: "La richiesta è in conflitto con lo stato attuale della risorsa.",
      pt: "A solicitação está em conflito com o estado atual do recurso.",
    },
  } as ElbeError,
  gone: {
    code: "HTTP_410",
    message: {
      de: "Nicht mehr verfügbar",
      en: "Gone",
      es: "Ya no disponible",
      fr: "Parti",
      it: "Non più disponibile",
      pt: "Não mais disponível",
    },
    description: {
      de: "Die angeforderte Ressource ist nicht mehr verfügbar.",
      en: "The requested resource is no longer available.",
      es: "El recurso solicitado ya no está disponible.",
      fr: "La ressource demandée n'est plus disponible.",
      it: "La risorsa richiesta non è più disponibile.",
      pt: "O recurso solicitado não está mais disponível.",
    },
  } as ElbeError,
  lengthRequired: {
    code: "HTTP_411",
    message: {
      de: "Länge erforderlich",
      en: "Length Required",
      es: "Longitud requerida",
      fr: "Longueur requise",
      it: "Lunghezza richiesta",
      pt: "Comprimento necessário",
    },
    description: {
      de: "Die Anfrage erfordert die Angabe der Content-Length.",
      en: "The request requires the Content-Length header.",
      es: "La solicitud requiere el encabezado Content-Length.",
      fr: "La requête nécessite l'en-tête Content-Length.",
      it: "La richiesta richiede l'intestazione Content-Length.",
      pt: "A solicitação requer o cabeçalho Content-Length.",
    },
  } as ElbeError,
  preconditionFailed: {
    code: "HTTP_412",
    message: {
      de: "Vorbedingung fehlgeschlagen",
      en: "Precondition Failed",
      es: "Fallo en la precondición",
      fr: "Précondition échouée",
      it: "Precondizione fallita",
      pt: "Falha na pré-condição",
    },
    description: {
      de: "Eine der Vorbedingungen der Anfrage ist fehlgeschlagen.",
      en: "One of the preconditions of the request failed.",
      es: "Una de las precondiciones de la solicitud falló.",
      fr: "Une des préconditions de la requête a échoué.",
      it: "Una delle precondizioni della richiesta è fallita.",
      pt: "Uma das pré-condições da solicitação falhou.",
    },
  } as ElbeError,
  contentTooLarge: {
    code: "HTTP_413",
    message: {
      de: "Inhalt zu groß",
      en: "Content Too Large",
      es: "Contenido demasiado grande",
      fr: "Contenu trop volumineux",
      it: "Contenuto troppo grande",
      pt: "Conteúdo muito grande",
    },
    description: {
      de: "Die Anfrage ist zu groß, um verarbeitet zu werden.",
      en: "The request is too large to be processed.",
      es: "La solicitud es demasiado grande para ser procesada.",
      fr: "La requête est trop volumineuse pour être traitée.",
      it: "La richiesta è troppo grande per essere elaborata.",
      pt: "A solicitação é muito grande para ser processada.",
    },
  } as ElbeError,
  uriTooLong: {
    code: "HTTP_414",
    message: {
      de: "URI zu lang",
      en: "URI Too Long",
      es: "URI demasiado larga",
      fr: "URI trop longue",
      it: "URI troppo lunga",
      pt: "URI muito longa",
    },
    description: {
      de: "Die URI der Anfrage ist zu lang.",
      en: "The URI of the request is too long.",
      es: "El URI de la solicitud es demasiado largo.",
      fr: "L'URI de la requête est trop longue.",
      it: "L'URI della richiesta è troppo lunga.",
      pt: "O URI da solicitação é muito longo.",
    },
  } as ElbeError,
  unsupportedMediaType: {
    code: "HTTP_415",
    message: {
      de: "Medientyp nicht unterstützt",
      en: "Unsupported Media Type",
      es: "Tipo de medio no soportado",
      fr: "Type de média non supporté",
      it: "Tipo di media non supportato",
      pt: "Tipo de mídia não suportado",
    },
    description: {
      de: "Der Medientyp der Anfrage wird nicht unterstützt.",
      en: "The media type of the request is not supported.",
      es: "El tipo de medio de la solicitud no es compatible.",
      fr: "Le type de média de la requête n'est pas supporté.",
      it: "Il tipo di media della richiesta non è supportato.",
      pt: "O tipo de mídia da solicitação não é suportado.",
    },
  } as ElbeError,
  rangeNotSatisfiable: {
    code: "HTTP_416",
    message: {
      de: "Bereich nicht erfüllbar",
      en: "Range Not Satisfiable",
      es: "Rango no satisfacible",
      fr: "Plage non satisfaisante",
      it: "Intervallo non soddisfacente",
      pt: "Intervalo não satisfatório",
    },
    description: {
      de: "Der angeforderte Bereich kann nicht bereitgestellt werden.",
      en: "The requested range cannot be provided.",
      es: "El rango solicitado no se puede proporcionar.",
      fr: "La plage demandée ne peut pas être fournie.",
      it: "L'intervallo richiesto non può essere fornito.",
      pt: "O intervalo solicitado não pode ser fornecido.",
    },
  } as ElbeError,
  expectationFailed: {
    code: "HTTP_417",
    message: {
      de: "Erwartung fehlgeschlagen",
      en: "Expectation Failed",
      es: "Fallo en la expectativa",
      fr: "Échec de l'attente",
      it: "Aspettativa fallita",
      pt: "Falha na expectativa",
    },
    description: {
      de: "Die Erwartung, die in der Anfrage angegeben wurde, konnte nicht erfüllt werden.",
      en: "The expectation given in the request could not be met.",
      es: "La expectativa dada en la solicitud no pudo ser cumplida.",
      fr: "L'attente donnée dans la requête n'a pas pu être satisfaite.",
      it: "L'aspettativa data nella richiesta non è stata soddisfatta.",
      pt: "A expectativa dada na solicitação não pôde ser atendida.",
    },
  } as ElbeError,
  imATeapot: {
    code: "HTTP_418",
    message: {
      de: "Ich bin eine Teekanne",
      en: "I'm a teapot",
      es: "Soy una tetera",
      fr: "Je suis une théière",
      it: "Sono una teiera",
      pt: "Eu sou um bule",
    },
    description: {
      de: "Der Server kann die Anfrage nicht ausführen, da er eine Teekanne ist.",
      en: "The server cannot process the request because it is a teapot.",
      es: "El servidor no puede procesar la solicitud porque es una tetera.",
      fr: "Le serveur ne peut pas traiter la requête car il est une théière.",
      it: "Il server non può elaborare la richiesta perché è una teiera.",
      pt: "O servidor não pode processar a solicitação porque é um bule.",
    },
  } as ElbeError,

  misdirectedRequest: {
    code: "HTTP_421",
    message: {
      de: "Fehlgeleitete Anfrage",
      en: "Misdirected Request",
      es: "Solicitud mal dirigida",
      fr: "Requête mal dirigée",
      it: "Richiesta mal indirizzata",
      pt: "Solicitação mal direcionada",
    },
    description: {
      de: "Die Anfrage wurde an einen Server gesendet, der nicht in der Lage ist, eine Antwort zu geben.",
      en: "The request was directed at a server that is not able to produce a response.",
      es: "La solicitud fue dirigida a un servidor que no puede producir una respuesta.",
      fr: "La requête a été dirigée vers un serveur incapable de produire une réponse.",
      it: "La richiesta è stata indirizzata a un server che non è in grado di fornire una risposta.",
      pt: "A solicitação foi direcionada a um servidor que não pode produzir uma resposta.",
    },
  } as ElbeError,
  unprocessableContent: {
    code: "HTTP_422",
    message: {
      de: "Unverarbeitbarer Inhalt",
      en: "Unprocessable Content",
      es: "Contenido no procesable",
      fr: "Contenu non traitable",
      it: "Contenuto non elaborabile",
      pt: "Conteúdo não processável",
    },
    description: {
      de: "Die Anfrage konnte aufgrund semantischer Fehler nicht verarbeitet werden.",
      en: "The request was well-formed but could not be processed due to semantic errors.",
      es: "La solicitud estaba bien formada pero no se pudo procesar debido a errores semánticos.",
      fr: "La requête était bien formée mais n'a pas pu être traitée en raison d'erreurs sémantiques.",
      it: "La richiesta era ben formata ma non è stata elaborata a causa di errori semantici.",
      pt: "A solicitação estava bem formada, mas não pôde ser processada devido a erros semânticos.",
    },
  } as ElbeError,
  locked: {
    code: "HTTP_423",
    message: {
      de: "Gesperrt",
      en: "Locked",
      es: "Bloqueado",
      fr: "Verrouillé",
      it: "Bloccato",
      pt: "Bloqueado",
    },
    description: {
      de: "Die angeforderte Ressource ist gesperrt.",
      en: "The requested resource is locked.",
      es: "El recurso solicitado está bloqueado.",
      fr: "La ressource demandée est verrouillée.",
      it: "La risorsa richiesta è bloccata.",
      pt: "O recurso solicitado está bloqueado.",
    },
  } as ElbeError,
  failedDependency: {
    code: "HTTP_424",
    message: {
      de: "Abhängigkeit fehlgeschlagen",
      en: "Failed Dependency",
      es: "Dependencia fallida",
      fr: "Dépendance échouée",
      it: "Dipendenza fallita",
      pt: "Falha na dependência",
    },
    description: {
      de: "Die Anfrage konnte nicht ausgeführt werden, da eine Abhängigkeit fehlgeschlagen ist.",
      en: "The request failed because it depended on another request that failed.",
      es: "La solicitud falló porque dependía de otra solicitud que falló.",
      fr: "La requête a échoué car elle dépendait d'une autre requête qui a échoué.",
      it: "La richiesta è fallita perché dipendeva da un'altra richiesta che è fallita.",
      pt: "A solicitação falhou porque dependia de outra solicitação que falhou.",
    },
  } as ElbeError,
  tooEarly: {
    code: "HTTP_425",
    message: {
      de: "Zu früh",
      en: "Too Early",
      es: "Demasiado pronto",
      fr: "Trop tôt",
      it: "Troppo presto",
      pt: "Muito cedo",
    },
    description: {
      de: "Die Anfrage wurde abgelehnt, da sie zu früh wiederholt wurde.",
      en: "The server is unwilling to risk processing a request that might be replayed.",
      es: "El servidor no está dispuesto a arriesgarse a procesar una solicitud que podría repetirse.",
      fr: "Le serveur ne veut pas risquer de traiter une requête qui pourrait être rejouée.",
      it: "Il server non è disposto a rischiare di elaborare una richiesta che potrebbe essere ripetuta.",
      pt: "O servidor não está disposto a arriscar processar uma solicitação que possa ser repetida.",
    },
  } as ElbeError,
  upgradeRequired: {
    code: "HTTP_426",
    message: {
      de: "Upgrade erforderlich",
      en: "Upgrade Required",
      es: "Actualización requerida",
      fr: "Mise à niveau requise",
      it: "Aggiornamento richiesto",
      pt: "Atualização necessária",
    },
    description: {
      de: "Der Client muss auf ein anderes Protokoll umsteigen, um die Anfrage abzuschließen.",
      en: "The client must switch to a different protocol to complete the request.",
      es: "El cliente debe cambiar a un protocolo diferente para completar la solicitud.",
      fr: "Le client doit passer à un autre protocole pour compléter la requête.",
      it: "Il client deve passare a un protocollo diverso per completare la richiesta.",
      pt: "O cliente deve mudar para um protocolo diferente para concluir a solicitação.",
    },
  } as ElbeError,
  preconditionRequired: {
    code: "HTTP_428",
    message: {
      de: "Vorbedingung erforderlich",
      en: "Precondition Required",
      es: "Se requiere precondición",
      fr: "Précondition requise",
      it: "Precondizione richiesta",
      pt: "Pré-condição necessária",
    },
    description: {
      de: "Die Anfrage erfordert, dass Bedingungen erfüllt sind.",
      en: "The origin server requires the request to be conditional.",
      es: "El servidor de origen requiere que la solicitud sea condicional.",
      fr: "Le serveur d'origine exige que la requête soit conditionnelle.",
      it: "Il server di origine richiede che la richiesta sia condizionale.",
      pt: "O servidor de origem exige que a solicitação seja condicional.",
    },
  } as ElbeError,
  tooManyRequests: {
    code: "HTTP_429",
    message: {
      de: "Zu viele Anfragen",
      en: "Too Many Requests",
      es: "Demasiadas solicitudes",
      fr: "Trop de requêtes",
      it: "Troppe richieste",
      pt: "Muitas solicitações",
    },
    description: {
      de: "Der Benutzer hat zu viele Anfragen in einem bestimmten Zeitraum gesendet.",
      en: "The user has sent too many requests in a given amount of time.",
      es: "El usuario ha enviado demasiadas solicitudes en un período de tiempo determinado.",
      fr: "L'utilisateur a envoyé trop de requêtes dans un laps de temps donné.",
      it: "L'utente ha inviato troppe richieste in un determinato periodo di tempo.",
      pt: "O usuário enviou muitas solicitações em um determinado período de tempo.",
    },
  } as ElbeError,
  requestHeaderFieldsTooLarge: {
    code: "HTTP_431",
    message: {
      de: "Anforderungsheaderfelder zu groß",
      en: "Request Header Fields Too Large",
      es: "Campos de encabezado de solicitud demasiado grandes",
      fr: "Champs d'en-tête de requête trop grands",
      it: "Campi dell'intestazione della richiesta troppo grandi",
      pt: "Campos de cabeçalho da solicitação muito grandes",
    },
    description: {
      de: "Die Serveranfrage konnte nicht verarbeitet werden, da die Headerfelder zu groß sind.",
      en: "The server is unwilling to process the request because its header fields are too large.",
      es: "El servidor no está dispuesto a procesar la solicitud porque sus campos de encabezado son demasiado grandes.",
      fr: "Le serveur ne veut pas traiter la requête car ses champs d'en-tête sont trop grands.",
      it: "Il server non è disposto a elaborare la richiesta perché i suoi campi di intestazione sono troppo grandi.",
      pt: "O servidor não está disposto a processar a solicitação porque seus campos de cabeçalho são muito grandes.",
    },
  } as ElbeError,
  unavailableForLegalReasons: {
    code: "HTTP_451",
    message: {
      de: "Aus rechtlichen Gründen nicht verfügbar",
      en: "Unavailable For Legal Reasons",
      es: "No disponible por razones legales",
      fr: "Indisponible pour des raisons légales",
      it: "Non disponibile per motivi legali",
      pt: "Indisponível por razões legais",
    },
    description: {
      de: "Die angeforderte Ressource ist aus rechtlichen Gründen nicht verfügbar.",
      en: "The requested resource is unavailable due to legal reasons.",
      es: "El recurso solicitado no está disponible por razones legales.",
      fr: "La ressource demandée est indisponible pour des raisons légales.",
      it: "La risorsa richiesta non è disponibile per motivi legali.",
      pt: "O recurso solicitado está indisponível por razões legais.",
    },
  } as ElbeError,
  internalServerError: {
    code: "HTTP_500",
    message: {
      de: "Interner Serverfehler",
      en: "Internal Server Error",
      es: "Error interno del servidor",
      fr: "Erreur interne du serveur",
      it: "Errore interno del server",
      pt: "Erro interno do servidor",
    },
    description: {
      de: "Der Server hat einen internen Fehler festgestellt.",
      en: "The server encountered an internal error.",
      es: "El servidor encontró un error interno.",
      fr: "Le serveur a rencontré une erreur interne.",
      it: "Il server ha riscontrato un errore interno.",
      pt: "O servidor encontrou um erro interno.",
    },
  } as ElbeError,
  notImplemented: {
    code: "HTTP_501",
    message: {
      de: "Nicht implementiert",
      en: "Not Implemented",
      es: "No implementado",
      fr: "Non implémenté",
      it: "Non implementato",
      pt: "Não implementado",
    },
    description: {
      de: "Der Server unterstützt die angeforderte Funktionalität nicht.",
      en: "The server does not support the functionality required to fulfill the request.",
      es: "El servidor no admite la funcionalidad requerida para cumplir con la solicitud.",
      fr: "Le serveur ne prend pas en charge la fonctionnalité requise pour répondre à la requête.",
      it: "Il server non supporta la funzionalità richiesta per soddisfare la richiesta.",
      pt: "O servidor não suporta a funcionalidade necessária para atender à solicitação.",
    },
  } as ElbeError,
  badGateway: {
    code: "HTTP_502",
    message: {
      de: "Fehlerhaftes Gateway",
      en: "Bad Gateway",
      es: "Puerta de enlace incorrecta",
      fr: "Mauvaise passerelle",
      it: "Gateway errata",
      pt: "Gateway incorreto",
    },
    description: {
      de: "Der Server hat eine ungültige Antwort vom Upstream-Server erhalten.",
      en: "The server received an invalid response from the upstream server.",
      es: "El servidor recibió una respuesta no válida del servidor upstream.",
      fr: "Le serveur a reçu une réponse invalide du serveur en amont.",
      it: "Il server ha ricevuto una risposta non valida dal server upstream.",
      pt: "O servidor recebeu uma resposta inválida do servidor upstream.",
    },
  } as ElbeError,
  serviceUnavailable: {
    code: "HTTP_503",
    message: {
      de: "Dienst nicht verfügbar",
      en: "Service Unavailable",
      es: "Servicio no disponible",
      fr: "Service indisponible",
      it: "Servizio non disponibile",
      pt: "Serviço indisponível",
    },
    description: {
      de: "Der Server ist derzeit nicht verfügbar.",
      en: "The server is currently unavailable.",
      es: "El servidor no está disponible actualmente.",
      fr: "Le serveur est actuellement indisponible.",
      it: "Il server non è attualmente disponibile.",
      pt: "O servidor está atualmente indisponível.",
    },
  } as ElbeError,
  gatewayTimeout: {
    code: "HTTP_504",
    message: {
      de: "Gateway-Zeitüberschreitung",
      en: "Gateway Timeout",
      es: "Tiempo de espera de la puerta de enlace",
      fr: "Délai d'attente de la passerelle",
      it: "Timeout del gateway",
      pt: "Tempo limite do gateway",
    },
    description: {
      de: "Der Server hat keine rechtzeitige Antwort vom Upstream-Server erhalten.",
      en: "The server did not receive a timely response from the upstream server.",
      es: "El servidor no recibió una respuesta oportuna del servidor upstream.",
      fr: "Le serveur n'a pas reçu de réponse en temps voulu du serveur en amont.",
      it: "Il server non ha ricevuto una risposta tempestiva dal server upstream.",
      pt: "O servidor não recebeu uma resposta oportuna do servidor upstream.",
    },
  } as ElbeError,
  httpVersionNotSupported: {
    code: "HTTP_505",
    message: {
      de: "HTTP-Version nicht unterstützt",
      en: "HTTP Version Not Supported",
      es: "Versión HTTP no soportada",
      fr: "Version HTTP non supportée",
      it: "Versione HTTP non supportata",
      pt: "Versão HTTP não suportada",
    },
    description: {
      de: "Die HTTP-Version der Anfrage wird nicht unterstützt.",
      en: "The HTTP version used in the request is not supported.",
      es: "La versión HTTP utilizada en la solicitud no es compatible.",
      fr: "La version HTTP utilisée dans la requête n'est pas supportée.",
      it: "La versione HTTP utilizzata nella richiesta non è supportata.",
      pt: "A versão HTTP usada na solicitação não é suportada.",
    },
  } as ElbeError,
  variantAlsoNegotiates: {
    code: "HTTP_506",
    message: {
      de: "Variante verhandelt ebenfalls",
      en: "Variant Also Negotiates",
      es: "La variante también negocia",
      fr: "La variante négocie également",
      it: "La variante negozia anche",
      pt: "A variante também negocia",
    },
    description: {
      de: "Der Server hat eine interne Konfigurationsfehler festgestellt.",
      en: "The server has an internal configuration error.",
      es: "El servidor tiene un error de configuración interna.",
      fr: "Le serveur a une erreur de configuration interne.",
      it: "Il server ha un errore di configurazione interna.",
      pt: "O servidor tem um erro de configuração interna.",
    },
  } as ElbeError,
  insufficientStorage: {
    code: "HTTP_507",
    message: {
      de: "Ungenügender Speicherplatz",
      en: "Insufficient Storage",
      es: "Almacenamiento insuficiente",
      fr: "Espace de stockage insuffisant",
      it: "Spazio di archiviazione insufficiente",
      pt: "Armazenamento insuficiente",
    },
    description: {
      de: "Der Server hat nicht genügend Speicherplatz, um die Anfrage zu erfüllen.",
      en: "The server is unable to store the representation needed to complete the request.",
      es: "El servidor no puede almacenar la representación necesaria para completar la solicitud.",
      fr: "Le serveur est incapable de stocker la représentation nécessaire pour compléter la requête.",
      it: "Il server non è in grado di memorizzare la rappresentazione necessaria per completare la richiesta.",
      pt: "O servidor não pode armazenar a representação necessária para concluir a solicitação.",
    },
  } as ElbeError,
  loopDetected: {
    code: "HTTP_508",
    message: {
      de: "Schleife entdeckt",
      en: "Loop Detected",
      es: "Bucle detectado",
      fr: "Boucle détectée",
      it: "Loop rilevato",
      pt: "Loop detectado",
    },
    description: {
      de: "Der Server hat eine Endlosschleife in der Anfrage entdeckt.",
      en: "The server detected an infinite loop while processing the request.",
      es: "El servidor detectó un bucle infinito mientras procesaba la solicitud.",
      fr: "Le serveur a détecté une boucle infinie lors du traitement de la requête.",
      it: "Il server ha rilevato un loop infinito durante l'elaborazione della richiesta.",
      pt: "O servidor detectou um loop infinito ao processar a solicitação.",
    },
  } as ElbeError,
  notExtended: {
    code: "HTTP_510",
    message: {
      de: "Nicht erweitert",
      en: "Not Extended",
      es: "No extendido",
      fr: "Non étendu",
      it: "Non esteso",
      pt: "Não estendido",
    },
    description: {
      de: "Die Anfrage erfordert weitere Erweiterungen, um abgeschlossen zu werden.",
      en: "Further extensions to the request are required for the server to fulfill it.",
      es: "Se requieren más extensiones para que el servidor pueda cumplir con la solicitud.",
      fr: "Des extensions supplémentaires à la requête sont nécessaires pour que le serveur puisse la traiter.",
      it: "Sono necessarie ulteriori estensioni alla richiesta affinché il server possa soddisfarla.",
      pt: "Extensões adicionais à solicitação são necessárias para que o servidor possa atendê-la.",
    },
  } as ElbeError,
  networkAuthenticationRequired: {
    code: "HTTP_511",
    message: {
      de: "Netzwerkauthentifizierung erforderlich",
      en: "Network Authentication Required",
      es: "Se requiere autenticación de red",
      fr: "Authentification réseau requise",
      it: "Autenticazione di rete richiesta",
      pt: "Autenticação de rede necessária",
    },
    description: {
      de: "Der Client muss sich authentifizieren, um Netzwerkzugriff zu erhalten.",
      en: "The client needs to authenticate to gain network access.",
      es: "El cliente necesita autenticarse para obtener acceso a la red.",
      fr: "Le client doit s'authentifier pour accéder au réseau.",
      it: "Il client deve autenticarsi per ottenere l'accesso alla rete.",
      pt: "O cliente precisa se autenticar para obter acesso à rede.",
    },
  } as ElbeError,
};

const generalErrors = {
  unknown: {
    code: "unknown",
    message: {
      de: "Unbekannter Fehler",
      en: "Unknown Error",
      es: "Error desconocido",
      fr: "Erreur inconnue",
      it: "Errore sconosciuto",
      pt: "Erro desconhecido",
    },
    description: {
      de: "Ein unbekannter Fehler ist aufgetreten.",
      en: "An unknown error occurred.",
      es: "Se produjo un error desconocido.",
      fr: "Une erreur inconnue s'est produite.",
      it: "Si è verificato un errore sconosciuto.",
      pt: "Ocorreu um erro desconhecido.",
    },
  } as ElbeError,
};

export const errors = {
  http: _httpErrors,
  ...generalErrors,
};
