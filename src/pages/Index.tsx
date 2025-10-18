import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [phoneResult, setPhoneResult] = useState<any>(null);
  const [telegramResult, setTelegramResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const searchByPhone = async () => {
    if (!phoneNumber) {
      toast({ title: "Ошибка", description: "Введите номер телефона", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setPhoneResult({
        phone: phoneNumber,
        fullName: "Иванов Иван Иванович",
        birthDate: "15.03.1985",
        age: 39,
        region: "Москва",
        operator: "МегаФон",
        parents: "Иванов Иван Петрович, Иванова Мария Сергеевна",
        address: "г. Москва, ул. Ленина, д. 10",
        email: "ivanov@example.com",
        socialMedia: ["VK", "Instagram", "Facebook"]
      });
      setLoading(false);
      toast({ title: "Успешно", description: "Информация найдена" });
    }, 1500);
  };

  const searchByTelegram = async () => {
    if (!telegramUsername) {
      toast({ title: "Ошибка", description: "Введите username", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setTelegramResult({
        username: telegramUsername,
        fullName: "Петров Петр Петрович",
        phone: "+7 (900) 123-45-67",
        userId: "123456789",
        bio: "Разработчик | Москва",
        groups: ["Tech Community", "Developers Chat", "OSINT Tools"],
        lastSeen: "2 часа назад",
        photoUrl: "/placeholder.svg"
      });
      setLoading(false);
      toast({ title: "Успешно", description: "Профиль найден" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="watermark">OSINT 🤖</div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 animate-pulse"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-12 pt-8">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 glowing-text font-orbitron">
            Вас приветствует OSINT MASTER
          </h1>
          <p className="text-gray-400 text-lg">Анонимный поиск информации</p>
          <div className="flex justify-center gap-2 mt-6">
            <Badge variant="outline" className="border-red-500 text-red-500">
              <Icon name="Shield" size={14} className="mr-1" />
              Анонимно
            </Badge>
            <Badge variant="outline" className="border-green-500 text-green-500">
              <Icon name="Zap" size={14} className="mr-1" />
              Быстро
            </Badge>
            <Badge variant="outline" className="border-blue-500 text-blue-500">
              <Icon name="Database" size={14} className="mr-1" />
              База данных
            </Badge>
          </div>
        </header>

        <Tabs defaultValue="phone" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900 border border-red-900">
            <TabsTrigger value="phone" className="data-[state=active]:bg-red-600">
              <Icon name="Phone" size={18} className="mr-2" />
              Поиск по телефону
            </TabsTrigger>
            <TabsTrigger value="telegram" className="data-[state=active]:bg-red-600">
              <Icon name="Send" size={18} className="mr-2" />
              Поиск по Telegram
            </TabsTrigger>
          </TabsList>

          <TabsContent value="phone" className="mt-6">
            <Card className="bg-gray-900/80 border-red-900 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-red-500 flex items-center gap-2">
                  <Icon name="Phone" size={24} />
                  Поиск по номеру телефона
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Введите номер для получения детальной информации
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="+7 (900) 123-45-67"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-black/50 border-gray-700 focus:border-red-500 text-white"
                  />
                  <Button 
                    onClick={searchByPhone}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 min-w-[120px]"
                  >
                    {loading ? (
                      <Icon name="Loader2" size={18} className="animate-spin" />
                    ) : (
                      <>
                        <Icon name="Search" size={18} className="mr-2" />
                        Найти
                      </>
                    )}
                  </Button>
                </div>

                {phoneResult && (
                  <div className="mt-6 p-6 bg-black/50 border border-red-900 rounded-lg animate-fade-in">
                    <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
                      <Icon name="UserCheck" size={20} />
                      Результаты поиска
                    </h3>
                    <div className="grid gap-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <Icon name="Phone" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Номер:</span> {phoneResult.phone}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="User" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">ФИО:</span> {phoneResult.fullName}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Calendar" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Дата рождения:</span> {phoneResult.birthDate}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Cake" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Возраст:</span> {phoneResult.age} лет
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="MapPin" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Регион:</span> {phoneResult.region}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Smartphone" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Оператор:</span> {phoneResult.operator}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Users" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Родители:</span> {phoneResult.parents}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Home" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Адрес:</span> {phoneResult.address}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Mail" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Email:</span> {phoneResult.email}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Share2" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Социальные сети:</span> {phoneResult.socialMedia.join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="telegram" className="mt-6">
            <Card className="bg-gray-900/80 border-red-900 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-red-500 flex items-center gap-2">
                  <Icon name="Send" size={24} />
                  Поиск по Telegram Username
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Введите username для поиска информации о профиле
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="@username"
                    value={telegramUsername}
                    onChange={(e) => setTelegramUsername(e.target.value)}
                    className="bg-black/50 border-gray-700 focus:border-red-500 text-white"
                  />
                  <Button 
                    onClick={searchByTelegram}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 min-w-[120px]"
                  >
                    {loading ? (
                      <Icon name="Loader2" size={18} className="animate-spin" />
                    ) : (
                      <>
                        <Icon name="Search" size={18} className="mr-2" />
                        Найти
                      </>
                    )}
                  </Button>
                </div>

                {telegramResult && (
                  <div className="mt-6 p-6 bg-black/50 border border-red-900 rounded-lg animate-fade-in">
                    <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
                      <Icon name="UserCheck" size={20} />
                      Профиль найден
                    </h3>
                    <div className="grid gap-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <Icon name="AtSign" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Username:</span> @{telegramResult.username}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="User" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Имя:</span> {telegramResult.fullName}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Phone" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Телефон:</span> {telegramResult.phone}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Hash" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">User ID:</span> {telegramResult.userId}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="FileText" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Био:</span> {telegramResult.bio}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Users" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Группы:</span> {telegramResult.groups.join(", ")}
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="Clock" size={18} className="text-red-500 mt-1" />
                        <div>
                          <span className="text-gray-500">Последняя активность:</span> {telegramResult.lastSeen}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="mt-16 text-center text-gray-500 pb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="HelpCircle" size={18} />
            <span>Помощь:</span>
            <a 
              href="https://t.me/osint_gromov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              @osint_gromov
            </a>
          </div>
          <p className="text-xs text-gray-600">OSINT MASTER © 2024</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;