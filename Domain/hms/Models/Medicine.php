<?php
require_once __DIR__ . "/Room.php";
require_once __DIR__ . "/Prescription.php";
require_once __DIR__ . "/MedicalService.php";
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Medicine
{
    protected EntityManager $entityManager;

    /**
     * @param EntityManager $entityManager
     */
    public function setEntityManager(EntityManager $entityManager): void
    {
        $this->entityManager = $entityManager;
    }
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;
    /**
     * @ORM\Column(length=30)
     */
    private $name;
    /**
     * @ORM\Column(length=30)
     */
    private $origin;
    /**
     * @ORM\Column(type="integer")
     */
    private $price;
    /**
     * @ORM\Column(type="date")
     */
    private $expireDay;
    /**
     * Many Prescriptions Include Many Medicines
     * @ORM\OneToMany(targetEntity="PrescriptionMedicine", mappedBy="medicine")
     */
    private $prescriptionMedicines;

    public function __construct()
    {
        $this->prescriptionMedicines = new ArrayCollection();
    }

    /**
     * Get many Prescriptions Include Many Medicines
     */
    public function getPrescriptionMedicines()
    {
        return $this->prescriptionMedicines;
    }

    /**
     * Set many Prescriptions Include Many Medicines
     *
     * @return  self
     */
    public function setPrescriptionMedicines($prescriptionMedicines)
    {
        $this->prescriptionMedicines = $prescriptionMedicines;

        return $this;
    }

    /**
     * Get the value of expireDay
     */
    public function getExpireDay()
    {
        return $this->expireDay->format('Y-m-d');
    }

    /**
     * Set the value of expireDay
     *
     * @param string $expireDay
     * @return  self
     */
    public function setExpireDay(string $expireDay)
    {
        $this->expireDay = DateTime::createFromFormat('Y-m-d', $expireDay);

        return $this;
    }

    /**
     * Get the value of price
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set the value of price
     *
     * @return  self
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get the value of origin
     */
    public function getOrigin()
    {
        return $this->origin;
    }

    /**
     * Set the value of origin
     *
     * @return  self
     */
    public function setOrigin($origin)
    {
        $this->origin = $origin;

        return $this;
    }

    /**
     * Get the value of name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    public function get () {
        return [
            "id" => $this->getId(),
            "name" => $this->getName(),
            "origin" => $this->getOrigin(),
            "price" => $this->getPrice(),
            "expireDay" => $this->getExpireDay()
        ];
    }

    public static function validate(array $fields): bool
    {
        if (count($fields) == 4
            && array_key_exists("name", $fields)
            && array_key_exists("price", $fields)
            && array_key_exists("origin", $fields)
            && array_key_exists("expireDay", $fields)
            && $fields["name"] !== ""
            && $fields["price"] !== ""
            && $fields["origin"] !== ""
            && $fields["expireDay"] !== ""
        ) {
            return true;
        }
        return false;
    }
}