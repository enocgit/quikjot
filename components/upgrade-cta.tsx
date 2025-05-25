import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Typography } from "./ui/typography";

const UpgradeCTA = () => {
  return (
    <Card className="pt-0">
      <CardHeader className="p-0">
        <div className="bg-blue-200 rounded-t-lg h-40 bg-[url('/assets/images/rocket.png')] bg-contain bg-no-repeat"></div>
      </CardHeader>
      <CardContent className="">
        <div className="space-y-2">
          <Typography>Upgrade for more features!</Typography>
          <Button className="bg-orange-400 hover:bg-secondary hover:text-secondary-foreground">
            Upgrade
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpgradeCTA;
